using Breeze.ContextProvider;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using Northwind.DataAccess;
using Northwind.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace TsNorthwind.Controllers
{
        [BreezeController]
        public class NorthwindController : ApiController
        {
            private readonly NorthwindRepository _repository;

            public NorthwindController() : this(null) { }

            // Todo: inject via an interface rather than "new" the concrete class
            public NorthwindController(NorthwindRepository repository)
            {
                _repository = repository ?? new NorthwindRepository();
            }

            protected override void Initialize(HttpControllerContext controllerContext)
            {
                base.Initialize(controllerContext);
                _repository.UserSessionId = getUserSessionId();
            }

            // ~/breeze/northwind/Metadata
            [HttpGet]
            public string Metadata()
            {
                return _repository.Metadata;
            }

            // ~/breeze/northwind/SaveChanges
            [HttpPost]
            public SaveResult SaveChanges(JObject saveBundle)
            {
                return _repository.SaveChanges(saveBundle);
            }

            [HttpGet]
            // See http://stackoverflow.com/questions/21775107/breeze-predicate-on-multiple-levels-of-children/21779728#21779728
            [EnableBreezeQuery(MaxAnyAllExpressionDepth = 5)]
            public IQueryable<Customer> Customers()
            {
                return _repository.Customers;
            }

            [HttpGet]
            public IEnumerable<Customer> CustomersWithOptions(System.Web.Http.OData.Query.ODataQueryOptions queryOptions)
            {
                // Process the queryOptions manually; allows extra processing before and after the query is performed
                var queryable = _repository.Customers;
                var newQueryable = queryOptions.ApplyTo(queryable).Cast<Customer>();
                newQueryable = newQueryable.Where(c => c.Country == "Germany");
                
                var list = newQueryable.ToList();
                // do something else to the list...
                return list;
            }

            [HttpGet]
            public IQueryable<Customer> CustomersAndOrders()
            {
                return _repository.CustomersAndOrders;
            }

            [HttpGet]
            [EnableBreezeQuery]
            public HttpResponseMessage CustomersAsHRM()
            {
                return Request.CreateResponse(HttpStatusCode.OK, _repository.Customers);
            }

            [HttpPost]
            // For breeze labs "breeze.ajaxpost" tests
            public HttpResponseMessage CustomersWithFilterOptions(JObject options)
            {
                // for debugging
                var queryParams = Request.GetQueryNameValuePairs();

                // do the job
                return Request.CreateResponse(HttpStatusCode.OK,
                  _repository.CustomersWithFilterOptions(options));
            }

            [HttpGet]
            public IQueryable<Order> OrdersForProduct(int productID = 0)
            {
                return _repository.OrdersForProduct(productID);
            }

            [HttpGet]
            public IQueryable<Customer> CustomersStartingWithA()
            {
                return _repository.CustomersStartingWithA;
            }

            // "withParameters" example
            [HttpGet]
            public IQueryable<Customer> CustomersStartingWith(string companyName)
            {
                var custs = _repository.Customers.Where(c => c.CompanyName.StartsWith(companyName));
                return custs;
            }

            [HttpGet]
            public IQueryable<InternationalOrder> InternationalOrders()
            {
                return _repository.InternationalOrders;
            }
            [HttpGet]
            [EnableBreezeQuery(MaxExpansionDepth = 3)]
            public IQueryable<Order> Orders()
            {
                return _repository.Orders;
            }

            [HttpGet]
            public IQueryable<Order> OrdersAndCustomers()
            {
                return _repository.OrdersAndCustomers;
            }

            [HttpGet]
            // should guard against pulling too much data with limiting EnableBreezeQueryAttribute, e.g.
            [EnableBreezeQuery(MaxTop = 10)]
            public IQueryable<Order> OrdersAndDetails()
            {
                return _repository.OrdersAndDetails;
            }

            [HttpGet]
            public IQueryable<Employee> Employees()
            {
                return _repository.Employees;
            }

            [HttpGet]
            public IQueryable<EmployeeTerritory> EmployeeTerritories()
            {
                return _repository.EmployeeTerritories;
            }

            [HttpGet]
            public IQueryable<OrderDetail> OrderDetails()
            {
                return _repository.OrderDetails;
            }

            [HttpGet]
            public IQueryable<Product> Products()
            {
                return _repository.Products;
            }

            [HttpGet]
            public IQueryable<Region> Regions()
            {
                return _repository.Regions;
            }

            [HttpGet]
            public IQueryable<Supplier> Suppliers()
            {
                return _repository.Suppliers;
            }

            [HttpGet]
            public IQueryable<Territory> Territories()
            {
                return _repository.Territories;
            }

            /*********************************************************
            * Lookups: Two ways of sending a bag of diverse entities;
            *          no obvious advantage to one vs. the other
            ********************************************************/
            /// <summary>
            /// Query returing an array of the entity lists:
            /// Regions, Territories, and Categories.
            /// </summary>
            /// <returns>
            /// Returns an array, not an IQueryable.
            /// Each array element is a different entity list.
            /// Note that the list elements arrive on the client
            /// as objects, not arrays, with properties
            /// such as '0', '1', '2' ...
            /// See the DocCode:QueryTests (Projections) module.
            /// </returns>
            /// <remarks>
            /// N.B. Category is only available through lookup;
            /// it doesn't have its own query method.
            /// </remarks>
            [HttpGet]
            public object LookupsArray()
            {
                var regions = _repository.Regions;
                var territories = _repository.Territories;
                var categories = _repository.Categories;

                var lookups = new object[] { regions, territories, categories };
                return lookups;
            }

            /// <summary>
            /// Query returing a 1-element array with a lookups object whose
            /// properties are all Regions, Territories, and Categories.
            /// </summary>
            /// <returns>
            /// Returns one object, not an IQueryable,
            /// whose properties are "region", "territory", "category".
            /// The items arrive as arrays.
            /// </returns>
            /// <remarks>
            /// N.B. Category is only available through lookup;
            /// it doesn't have its own query method.
            /// </remarks>
            [HttpGet]
            public object Lookups()
            {
                var regions = _repository.Regions;
                var territories = _repository.Territories;
                var categories = _repository.Categories;

                var lookups = new { regions, territories, categories };
                return lookups;
            }

            /// <summary>
            /// Get the UserSessionId from value in the request header
            /// </summary>
            private Guid getUserSessionId()
            {
                try
                {
                    var id = Request.Headers.GetValues("X-UserSessionId").First();
                    return Guid.Parse(id);
                }
                catch
                {
                    return Guid.Empty;
                }
            }
        }
}
