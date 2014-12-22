using System;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Videos.Models;
using Videos.Models.ViewModel;
using Videos.Repository.Interface;
using Videos.UnitOfWork.Interface;

namespace Videos.Controllers.Api
{
	[EnableCors(origins:"*", headers:"*", methods:"*")]
    public class CategoryController : ApiController
    {
		private readonly IUnitOfWork _unitOfWork;
        public CategoryController(IUnitOfWork uow)
        {
			_unitOfWork = uow;
        }

        // GET api/Category
        public HttpResponseMessage GetCategories()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _unitOfWork.categoryRepos.All.Select(a => new CategoryViewModel { Id = a.Id, Description = a.Description }).AsEnumerable());
        }

        public HttpResponseMessage GetCategory(int id)
        {
            var ct = _unitOfWork.categoryRepos.Find(id);
            if (ct == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return Request.CreateResponse(HttpStatusCode.OK,  new CategoryViewModel { Id = ct.Id, Description = ct.Description });

        }

        // PUT api/Category/5
        public HttpResponseMessage PutCategory(int id, CategoryViewModel category)
        {
            if (ModelState.IsValid && id == category.Id)
            {
                var c = new Category { Id = category.Id, Description = category.Description };

                try
                {
                    _unitOfWork.categoryRepos.InsertOrUpdate(c);
                    _unitOfWork.Save();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/Category
        public HttpResponseMessage PostCategory(CategoryViewModel category)
        {
            if (ModelState.IsValid)
            {
                var c = new Category { Description = category.Description };
                _unitOfWork.categoryRepos.InsertOrUpdate(c);
                _unitOfWork.Save();
                category.Id = c.Id;
                var response = Request.CreateResponse(HttpStatusCode.Created, category);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = category.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Category/5
        public HttpResponseMessage DeleteCategory(int id)
        {
            var category = _unitOfWork.categoryRepos.Find(id);
            if (category == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _unitOfWork.categoryRepos.Delete(id);
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, category);
        }

        protected override void Dispose(bool disposing)
        {
            _unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}