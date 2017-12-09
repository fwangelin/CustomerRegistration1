using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Inlamning1.Entities;


namespace Inlamning1.Controllers
{
    [Route("api/customers")]
    public class CustomerController : Controller
    {
        private DatabaseContext databaseContext;

        public CustomerController(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
            databaseContext.Database.EnsureCreated();
        }

        [HttpPost]
        public IActionResult Add(Customer customer)
        {

            databaseContext.Add(customer);
            databaseContext.SaveChanges();

            return Ok(customer.Id);
        }

        [HttpGet, Route("getCustomers")]
        public IActionResult GetCustomers()
        {

            return Ok(databaseContext.Customers);
        }

       [HttpGet, Route("getOneCustomer")]
        public Customer GetOneCustomer(int id)
        {
            return databaseContext.Customers.SingleOrDefault(c => c.Id == id);
        }

        [HttpDelete]
        public IActionResult DeleteCustomer(int Id)
        {
            var deleteRow = databaseContext.Customers.Find(Id);
            databaseContext.Remove(deleteRow);
            databaseContext.SaveChanges();
            return Ok("Deleted!");
        }

        [HttpPut]
        public IActionResult EditCustomer(Customer customer)
        {

            var editedCustomer = databaseContext.Customers.Find(customer.Id);

            editedCustomer.FirstName = customer.FirstName;
            editedCustomer.LastName = customer.LastName;
            editedCustomer.Gender = customer.Gender;
            editedCustomer.Age = customer.Age;
            editedCustomer.Email = customer.Email;

            databaseContext.Update(editedCustomer);
            databaseContext.SaveChanges();

            return Ok("Edited!");
        }

    }
}
