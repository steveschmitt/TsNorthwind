# TsNorthwind

A series of exercises that build up a simple [Angular](https://angularjs.org/) / [Breeze](http://getbreezenow.com/) app using [TypeScript](http://typescriptlang.org/).  

The app is a Visual Studio 2013 solution, with the backend (server side) already set up.  The backend includes:
 - a [Northwind](https://northwinddatabase.codeplex.com/) database (actually the [NorthwindIB](http://drc.ideablade.com/devforce-2012/bin/view/Documentation/NorthwindIBmdf) flavor) as a SQL Server CE database (TsNorthwind\App_Data\NorthwindIB.sdf)
 - Northwind domain model (Northwind.Models)
 - [Entity Framework](https://msdn.microsoft.com/en-us/data/ef.aspx) Code First data access
 - ASP.NET Web API
 - Breeze.Server.NET for Web API and Entity Framework

The server side is set up, but the client side initially consists of just a static Index.html page.  The student is invited to gradually create an Angular / Breeze application through a series of 20 exercises.

The exercises appear as folders, `app-01` through `app-20`, which contain the runnable app in different stages of development.  They are light on commentary, as these exercises are intended for use in an instructor-led class.

## Exercises

**app-01**
Adds angular.js script to the HTML page, and adds an Angular module and controller (AppController as vm) to display a simple message.

**app-02**
Adds the Customer model class, and now the vm exposes a customer object.

**app-03**
Creates an array of customers.  VM exposes the array of customers and the HTML page uses `ng-repeat` to display the list.

**app-04**
Adds `ng-click` event handler, to select and display the current customer.

**app-05**
Adds firstName, lastName, and fullName to Customer class.  Adds editing by binding input textboxes to customer fields using `ng-model`.

**app-06**
Demonstrates view composition with `ng-include`, separating the customer list and customer detail views.  Experiment with ng-if vs ng-show by inspecting the DOM.

**app-07**
Introduces dependency injection using a "config" value service, which is injected into the AppController.

**app-08**
Introduces a dataservice, which is injected into the controller to provide the mock Customer data.

**app-09**
Introduces promises, and makes the dataservice return a promise for the customers instead of just an array.  Shows how digest cycle interacts with `$q` promises.

**app-10**
Introduces Breeze, adding the EntityManagerService to create an entitymanager, and BreezeDataservice to run a query.  AppController adds a showBreezeCustomers function that pops an alert showing customers retrieved from the server.

**app-11**
Introduces Angular filters.  app.filters.ts is added, and the "spaceout" filter and "customerSort" filters are created and used in customers.html.  Note performance implications of using filters in ng-repeat, as customerSort is being used.

**app-12**
Introduces a second controller, to be used when editing a customer.  EditService is added to pass the selected customer to the EditController.  This implementation doesn't work well, because the EditController just gets the customer in its constructor.

**app-13**
Updates the EditService in the previous lesson to make a clone of the customer.  EditService exposes the clone, and save and cancel methods.  EditController exposes the clone via a getter.

**app-14**
Lesson adds `ngRoute` and creates routes for customer list (#/cust) and edit (#/edit).  Routes are added in app.module.ts.  app.html is no longer used, because the customer.html and customer-detail.html are swapped in and out of ng-view.

**app-15**
Refines routing to pass an id param (#/edit/:id) to the edit view.  EditController uses the id to get the customer from the dataservice, and only uses the EditService for the save/cancel functions.  AppController no longer needs EditService, since it just passes the customer ID in the url.

**app-16**
Adds a directive to format the customer edit fields.  Initial implementation just copies the HTML from the view; refinement comes later, with the editInput directive and discussion of isolate scope.

**app-17**
Uses Breeze to retrieve and display the customer list.  The Breeze Customer class looks different from the mock Customer, so display fields must be changed.  

**app-18**
Adds next/prev pagination buttons to customer list.  Changes EditController to get customer entity using getCustomerById.  Changes save/cancel logic to ok/revert and removes EditService since revert is handled by Breeze.  Introduces `ng-class`, uses it to highlight changed customers.

**app-19**
Introduces Breeze validation; adds indicator for validation errors on the edit page.  Adds save button, saving customer changes back to the server.  

**app-20**
(This exercise should come after app-t01 and app-t02.) Demonstrates unit testing using $httpBackend to provide JSON results as if they came from the server.

**app-t01**
Introduces unit testing with Jasmine.  Demonstrates how to apply many types of assertions in a Jasmine spec.

**app-t02**
Demonstrates how to test parts of the application using Jasmine.  Tests the config service, the dataservice, and the AppController.