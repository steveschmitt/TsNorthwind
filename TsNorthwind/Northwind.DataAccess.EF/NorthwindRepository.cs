using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Newtonsoft.Json.Linq;
using Northwind.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Northwind.DataAccess
{
    using SaveMap = Dictionary<Type, List<EntityInfo>>;

    /// <summary>
    /// Repository (a "Unit of Work" really) of Northwind models.
    /// </summary>
    public class NorthwindRepository
    {
        public NorthwindRepository()
        {
            _contextProvider = new EFContextProvider<NorthwindContext>();

            _contextProvider.BeforeSaveEntitiesDelegate = BeforeSaveEntities;
        }

        private SaveMap BeforeSaveEntities(SaveMap saveMap)
        {
            if (saveMap.ContainsKey(typeof(Customer)))
            {
                var customerInfos = saveMap[typeof(Customer)];
                customerInfos.ForEach(entityInfo => {
                    var customer = (Customer) entityInfo.Entity;

                    // Change the country
                    entityInfo.OriginalValuesMap.Add("Country", customer.Country);
                    customer.Country = "Brazil";  // move all customers to Brazil
                });
            }
            return saveMap;
        }

        private void setChanged(EntityInfo entityInfo, string property, Object oldValue)
        {
            
        }

        public string Metadata
        {
            get
            {
                return _contextProvider.Metadata();
            }
        }

        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        public IQueryable<Category> Categories
        {
            get { return Context.Categories; }
        }

        public IQueryable<Customer> Customers
        {
            get { return Context.Customers; }
        }

        public IQueryable<Customer> CustomersAndOrders
        {
            get { return Context.Customers.Include("Orders"); }
        }

        public IQueryable<Customer> CustomersStartingWithA
        {
            get
            {
                return Context.Customers
                    .Where(c => c.CompanyName.StartsWith("A"));
            }
        }

        public IQueryable<Customer> CustomersWithFilterOptions(JObject options)
        {
            var query = Customers;
            if (options == null) { return query; }

            if (options["CompanyName"] != null)
            {
                var companyName = (string)options["CompanyName"];
                if (!String.IsNullOrEmpty(companyName))
                {
                    query = query.Where(c => c.CompanyName == companyName);
                }
            }

            if (options["Ids"] != null)
            {
                var ids = options["Ids"].Select(id => (Guid)id).ToList();
                if (ids.Count > 0)
                {
                    query = query.Where(c => ids.Contains(c.CustomerID));
                }
            }

            return query;
        }

        public IQueryable<Employee> Employees
        {
            get { return Context.Employees; }
        }

        public IQueryable<EmployeeTerritory> EmployeeTerritories
        {
            get { return Context.EmployeeTerritories; }
        }

        public IQueryable<Order> OrdersForProduct(int productID = 0)
        {
            var query = Orders;

            query = query.Include("Customer").Include("OrderDetails");

            return (productID == 0)
                        ? query
                        : query.Where(o => o.OrderDetails.Any(od => od.ProductID == productID));
        }

        public IQueryable<Order> Orders
        {
            get { return Context.Orders; }
        }

        public IQueryable<InternationalOrder> InternationalOrders
        {
            get { return Context.InternationalOrders; }
        }

        public IQueryable<Order> OrdersAndCustomers
        {
            get { return Context.Orders.Include("Customer"); }
        }

        public IQueryable<Order> OrdersAndDetails
        {
            get { return Context.Orders.Include("OrderDetails"); }
        }

        public IQueryable<OrderDetail> OrderDetails
        {
            get { return Context.OrderDetails; }
        }

        public IQueryable<Product> Products
        {
            get { return Context.Products; }
        }

        public IQueryable<Region> Regions
        {
            get { return Context.Regions; }
        }

        public IQueryable<Supplier> Suppliers
        {
            get { return Context.Suppliers; }
        }

        public IQueryable<Territory> Territories
        {
            get { return Context.Territories; }
        }


        /// <summary>
        /// The current user's UserSessionId, typically set by the controller
        /// </summary>
        /// <remarks>
        /// Guaranteed to exist and be a non-Empty Guid
        /// </remarks>
        public Guid UserSessionId
        {
            get { return _userSessionId; }
            set
            {
                _userSessionId = (value == Guid.Empty) ? _guestUserSessionId : value;
            }
        }

        #region Private

        private NorthwindContext Context { get { return _contextProvider.Context; } }

        private Guid _userSessionId = _guestUserSessionId;

        //private IQueryable<T> ForCurrentUser<T>(IQueryable<T> query) where T : class, ISaveable
        //{
        //    // Apply filtering to the query
        //    return query.Where(x => x.UserSessionId == null || x.UserSessionId == UserSessionId);
        //}

        private readonly EFContextProvider<NorthwindContext> _contextProvider;

        private const string _guestUserSessionIdName = "12345678-9ABC-DEF0-1234-56789ABCDEF0";
        private static readonly Guid _guestUserSessionId = new Guid(_guestUserSessionIdName);

        #endregion
    }
}
