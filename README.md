![This is an image](https://i.ibb.co/DQyKLh7/robot-br1-generated-100.jpg)

# noobs core

The noobs core project encapsulates infrastructure enables that allows for faster (hopefully) development of applications. 

What makes this framework different is that although the default run condition for Noobs core uses embedded and simple version of the default services so it can be run without any external dependancies, it can be scaled up to use enterprise components without any changes to the using application.

## Components
The following services are available for any application to use:

* **Configuration** : The configuration service is used for any config file based operations. It uses the standard [config](https://www.npmjs.com/package/config) package.

* **Caching** : The caching service enables caching operations. The default implementation uses a volatile in memory implementation.

* **Data Access** : The data access service enables database operations. The default implementation stores data on the local drive or In Memory (volatile). 


* **Data Access** : The data access service enables database operations. The default implementation stores data on the local drive or In Memory (volatile). 