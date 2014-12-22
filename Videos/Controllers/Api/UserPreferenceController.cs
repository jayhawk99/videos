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
    public class UserPreferenceController : ApiController
    {
		private readonly IUnitOfWork _unitOfWork;
		public UserPreferenceController(IUnitOfWork uow)
        {
			_unitOfWork = uow;
        }

        public HttpResponseMessage GetUserPreference(int userpreferenceid)
        {
	        var data =
		        _unitOfWork.userPreferencesRepos.All.SingleOrDefault(
			        a => a.UserId == WebSecurity.CurrentUserId && a.PreferenceId == userpreferenceid);

			return Request.CreateResponse(HttpStatusCode.OK, data);
        }

        public HttpResponseMessage PutUserPreferences(string value, int userpreferenceid)
        {
            var userid = WebSecurity.CurrentUserId;

			var v = _unitOfWork.userPreferencesRepos.All.SingleOrDefault(a => a.UserId == userid && a.PreferenceId == userpreferenceid) ?? new UserPreferences();

            v.Value = value;
            v.PreferenceId = userpreferenceid;
            v.UserId = userid;

            try
            {
				_unitOfWork.userPreferencesRepos.InsertOrUpdate(v);
				_unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, v);
        }
		protected override void Dispose(bool disposing)
		{
			_unitOfWork.Dispose();
			base.Dispose(disposing);
		}
    }
}