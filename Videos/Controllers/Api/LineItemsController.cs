using System;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Videos.Models;
using Videos.Models.ViewModel;
using Videos.Repository.Interface;
using Videos.UnitOfWork.Interface;

namespace Videos.Controllers.Api
{
    public class LineItemsController : ApiController
    {
		private readonly IUnitOfWork _unitOfWork;
        public LineItemsController(IUnitOfWork uow)
        {
			_unitOfWork = uow;
        }

        // GET api/LineItems
        public HttpResponseMessage GetLineItems()
        {
            var lineitems =
				_unitOfWork.lineItemsRepos.All
                .Select(
                    a =>
                    new LineItemViewModel
                        {
                            Color = new ColorViewModel { Id = a.Color.Id, Name = a.Color.Name },
                            Size = new SizeViewModel { Id = a.Size.Id, Name = a.Size.Name },
                            Id = a.Id,
                            Description = a.Description
                        }).AsEnumerable();

            return Request.CreateResponse(HttpStatusCode.OK, lineitems);
        }

        // GET api/LineItems/5
        public HttpResponseMessage GetLineItem(int id)
        {
			var lineitem = _unitOfWork.lineItemsRepos.Find(id);
            if (lineitem == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return Request.CreateResponse(HttpStatusCode.OK, new LineItemViewModel
            {
                Id = lineitem.Id,
                Description = lineitem.Description,
                Color = new ColorViewModel { Id = lineitem.Color.Id, Name = lineitem.Color.Name },
                Size = new SizeViewModel { Id = lineitem.Size.Id, Name = lineitem.Size.Name }
            });
        }



        // POST api/lineitems
        public HttpResponseMessage PostLineItem(LineItemViewModel itm)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                var l = new LineItem { Description = itm.Description, ColorId = itm.Color.Id, SizeId = itm.Size.Id };

				_unitOfWork.lineItemsRepos.InsertOrUpdate(l);
				_unitOfWork.Save();

                itm.Id = l.Id;

                var response = Request.CreateResponse(HttpStatusCode.Created, itm);

                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = itm.Id }));

                return response;
            }
        }


        // PUT api/lineitems/5
        public HttpResponseMessage PutVideo(int id, LineItemViewModel itm)
        {
            if (ModelState.IsValid && id == itm.Id)
            {
                var l = new LineItem { Id = itm.Id, Description = itm.Description, ColorId = itm.Color.Id, SizeId = itm.Size.Id };
                try
                {
					_unitOfWork.lineItemsRepos.InsertOrUpdate(l);
					_unitOfWork.Save();

                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                return Request.CreateResponse(HttpStatusCode.OK, l);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
        // DELETE api/videos/5
        public HttpResponseMessage DeleteVideo(int id)
        {
			var l = _unitOfWork.lineItemsRepos.Find(id);

            if (l == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
				_unitOfWork.lineItemsRepos.Delete(id);
				_unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, l);

        }


        protected override void Dispose(bool disposing)
        {
			_unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}