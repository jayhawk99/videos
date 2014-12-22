using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Videos.Models;
using Videos.Repository.Interface;
using Videos.UnitOfWork.Interface;
using WebMatrix.WebData;
namespace Videos.Controllers.Api
{
    public class VinScoreController : ApiController
    {
		private readonly IUnitOfWork _unitOfWork;
        public VinScoreController(IUnitOfWork uow)
        {
			_unitOfWork = uow;
        }

        public HttpResponseMessage Get(int globalcustomerid)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _unitOfWork.vinScoreRepos.All.SingleOrDefault(a => a.GlobalCustomerID == globalcustomerid));
        }
		protected override void Dispose(bool disposing)
		{
			_unitOfWork.Dispose();
			base.Dispose(disposing);
		}
    }
}
