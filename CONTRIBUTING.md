# Contributing

Below you will find some information and resources to help you contribute to the project. This is very basic, and doesn't actually cover important details so if you want to contribute then please feel free to make a PR for this.

## Note

If you are only doing frontend changes (React) then you can skip all of the server-sided steps and use the Qrindr API Endpoint for the backend. You are not required to start your own server to develop.

## Server 

For the server, you will need **PHP** and some form of HTTP server such as Apache, LightHTTP or Nginx. **If you are a Windows user, then XAMPP can deliver this**. You will also need **MariaDB** however some older versions of **MySQL** can also work.

## Client

For the client, you will need **Node** and **NPM** as it is required to install all of the dependencies. The frontend was built using **Create React App 5** so when you pull the repo all you need to do is just enter `/client` and enter `npm install`. To start working on it, you can use `npm start` which will go to http://localhost:3000

## Configs

Most people will contribute to this repository for the configs, so I'll give a basic explanation for how to modify these files.

### Adding / Modifying a Config

To create or modify a config, you must be in the `/server/Data/Games` directory which will contain all of the configs that are available in the dropdown on the site. You will likely want to view a few Config files before trying to do it yourself as some of the labelling can be considered complex if you do not understand what you are doing.

### Listing a Config to the Public

Inside of `/server/Data/Games.php` you will find a list of results that contains all of the configs, and this is how Qrindr connects Configs to the proper items. This is also used as a way to help ordering, so obviously we want the Quake Champions configs to be together and not be scattered across the list as it makes it a bit harder to reach.