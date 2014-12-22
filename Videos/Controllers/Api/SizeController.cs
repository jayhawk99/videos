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
    public class SizeController : ApiController
    {
		private readonly IUnitOfWork _unitOfWork;
        public SizeController(IUnitOfWork uow)
        {
			_unitOfWork = uow;
        }

        // GET api/Size
        public HttpResponseMessage GetSizes()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _unitOfWork.sizeRepos.All.Select(a => new SizeViewModel { Id = a.Id, Name = a.Name }).AsEnumerable());
        }

        // GET api/Size/5
        public HttpResponseMessage GetSize(int id)
        {
            var size = _unitOfWork.sizeRepos.Find(id);
            if (size == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return Request.CreateResponse(HttpStatusCode.OK, new SizeViewModel { Id = size.Id, Name = size.Name });
        }

        protected override void Dispose(bool disposing)
        {
            _unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}