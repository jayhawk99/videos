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
    public class VideosController : ApiController
    {
		private readonly IUnitOfWork _unitOfWork;
        public VideosController(IUnitOfWork uow)
        {
			_unitOfWork = uow;
        }

        // GET api/videos
        public HttpResponseMessage GetAllVideos()
        {
            var retVal = _unitOfWork.videoRepos.All.Select(a => new VideoViewModel { Id = a.Id, Title = a.Title, Length = a.Length, 
                                    Category = new CategoryViewModel { Description = a.Category.Description, Id = a.Category.Id } })
                   .AsEnumerable();
            return Request.CreateResponse(HttpStatusCode.OK, retVal);
        }

        // GET api/videos/5
        public HttpResponseMessage GetVideo(int id)
        {
            var v = _unitOfWork.videoRepos.Find(id);
            if (v != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, 
                    new VideoViewModel { Id = v.Id, 
                                        Category = new CategoryViewModel { Description = v.Category.Description, Id = v.Category.Id }, 
                                        Title = v.Title, 
                                        Length = v.Length });
            }
            throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
        }

        // POST api/videos
        public HttpResponseMessage PostVideo(VideoViewModel video)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                var v = new Video { Title = video.Title, Length = video.Length, CategoryId = video.Category.Id };

                _unitOfWork.videoRepos.InsertOrUpdate(v);
				_unitOfWork.Save();

                video.Id = v.Id;
                var response = Request.CreateResponse(HttpStatusCode.Created, video);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = v.Id }));
                return response;
            }
        }


        // PUT api/videos/5
        public HttpResponseMessage PutVideo(int id, VideoViewModel video)
        {
            if (ModelState.IsValid && id == video.Id)
            {
                var v = new Video { Id = video.Id, Title = video.Title, Length = video.Length, CategoryId = video.Category.Id };
                try
                {
                    _unitOfWork.videoRepos.InsertOrUpdate(v);
                    _unitOfWork.Save();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                return Request.CreateResponse(HttpStatusCode.OK, video);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
        // DELETE api/videos/5
        public HttpResponseMessage DeleteVideo(int id)
        {

            var video = _unitOfWork.videoRepos.Find(id);
            if (video == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            try
            {
                _unitOfWork.videoRepos.Delete(id);
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, video);
        }

        protected override void Dispose(bool disposing)
        {
            _unitOfWork.Dispose();
            base.Dispose(disposing);
        }

    }
}
