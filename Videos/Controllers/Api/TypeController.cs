using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Videos.Models;
using Videos.Repository.Interface;
using Videos.UnitOfWork.Interface;

namespace Videos.Controllers.Api
{
    public class TypeController : ApiController
    {
		private readonly IUnitOfWork _unitOfWork;
        public TypeController(IUnitOfWork uow)
        {
			_unitOfWork = uow;
        }

        // GET api/Type
        public HttpResponseMessage Get()
        {
			var goo = _unitOfWork.typeRepos.All.AsEnumerable();
            return Request.CreateResponse(HttpStatusCode.OK, goo);
        }

        // GET api/Type/New
        public HttpResponseMessage Get(int id)
        {
			var goo = _unitOfWork.typeRepos.Find(a => a.Id == id);
            return Request.CreateResponse(HttpStatusCode.OK, goo);
        }

        protected override void Dispose(bool disposing)
        {
			_unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}
