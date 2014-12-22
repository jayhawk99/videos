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
    public class ColorController : ApiController
    {
		private readonly IUnitOfWork _unitOfWork;
        public ColorController(IUnitOfWork uow)
        {
			_unitOfWork = uow;
        }
        // GET api/Color
        public HttpResponseMessage GetColors()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _unitOfWork.colorRepos.All.Select(a => new ColorViewModel { Id = a.Id, Name = a.Name }).AsEnumerable());
        }

        // GET api/Color/5
        public HttpResponseMessage GetColor(int id)
        {
            var color = _unitOfWork.colorRepos.Find(id);
            if (color == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return Request.CreateResponse(HttpStatusCode.OK, new ColorViewModel { Id = color.Id, Name = color.Name });
        }

        protected override void Dispose(bool disposing)
        {
            _unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}