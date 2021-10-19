const scriptsCache = {};

const deferred = (args) => {
  args = args || {};

  const { timeout } = args;

  let resolve;
  let reject;
  let timeoutId;

  const promise = new Promise((resolver, rejector) => {
    resolve = resolver;
    reject = rejector;
  });

  promise.resolve = (arg) => {
    clearTimeout(timeoutId);
    resolve(arg);
  };

  promise.reject = (arg) => {
    clearTimeout(timeoutId);
    reject(arg);
  };

  if (typeof timeout === "number") {
    const id = args.id || "anonymous deferred";
    timeoutId = setTimeout(
      () => reject({ reason: `timeout (${timeout}) reached on "${id}"` }),
      timeout
    );
  }

  return promise;
};

const loadJS = async (src) => {
  if (scriptsCache[src]) {
    return scriptsCache[src];
  }

  const dfd = deferred({ timeout: 30000 });

  const { document: doc } = window;

  const script = doc.createElement("script");

  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", src);

  script.addEventListener("error", (err) => {
    scriptsCache[src] = null;
    dfd.reject(err);
  });

  script.addEventListener("load", () => {
    dfd.resolve(script);
  });

  doc.head.appendChild(script);

  scriptsCache[src] = dfd;

  return dfd;
};

const loadRemote = async (remote) => {
  const { name, url } = remote;

  await loadJS(url);

  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__("default");
  const container = window[name]; // or get the container somewhere else

  if (!container || !container.init)
    throw new Error(`Cannot load external remote: ${name} from url: ${url}`);

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);

  console.log("__webpack_share_scopes__", __webpack_share_scopes__);

  return container;
};

export const loadComponent = ({ remote = {}, component } = {}) => {
  const { name, url } = remote;

  if (!url) throw new Error("Missing remote url");
  if (!name) throw new Error("Missing remote name");
  if (!component) throw new Error("Missing component");

  return async () => {
    const container = await loadRemote({ url, name });

    if (!container.get)
      throw new Error(`Cannot load external remote: ${name} from url: ${url}`);

    component = component.match(/^\.\//) ? component : `./${component}`;

    const factory = await container.get(component);

    if (!factory)
      throw new Error(
        `Cannot load ${component} in remote: ${name} from url ${url}`
      );

    const Module = factory();

    return Module;
  };
};
