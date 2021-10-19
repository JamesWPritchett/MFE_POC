## Microfrontend Architecture With Webpack Federation

Reference: 
- [Webpack Federation Tutorial](https://levelup.gitconnected.com/micro-frontends-step-by-step-using-react-webpack-5-and-module-federation-e4b9d840ec71)
- [Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Module Federation YouTube](https://www.youtube.com/watch?v=-LNcpralkjM&t=540s)

###Steps:
####1. Create Application
        - Create a parent application that will host the microfrontends
        - Create some amount of microfrontend applications that will be used within the parent application
        
####2. Add Microfrontend to Webpack.config.js
        - Add  "Webpack.config.js" to the parent application and the microfrontend applications
        - Add the components you want exported form the microfrontends to the Webpack.config.js
        - Add the microfrontends to the parent applications Webpack.config.js
        
####3. Lazy load the components in the parent application
        - Lazy load the components from their respective microfrontend


## Discoveries
        - Localstorage is not shared between the parent applicaiton and microfrontend applications
        - Props can be passed down from the parent application to microfrontend applications
        - Redux dispatch events and states can also be passed along to microfrontend applications
        - As long as the microfrontend applications are webpack compatible, they can be used within the parent application
        - The microfrontends are loaded asynchronously which will allow us to handle load failures
        - Microfrontends hosted on different platforms (GCP vs AWS) can be used in the parent container        
        
## Pros Vs. Cons
#### Pros:
        - Very simple to use and integrate
        - Microfrontends can be deployed independently from the parent container
#### Cons:
        - Cannot use react-scripts start/build/test. Must use Webpack CLI
        - Very specific boiler plate for Webpack configuration
        
# How to Demo
1. cd into each of the 3 microfrontends ("mfe${number}")
2. run npm install in all 3 microfrontends
3. run npx webpack serve in all 3 microfrontends
4. go to 'localhost:3000'