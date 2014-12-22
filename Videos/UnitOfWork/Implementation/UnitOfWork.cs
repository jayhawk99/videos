using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Videos.Models;
using Videos.Repository.Implementation;
using Videos.Repository.Interface;
using Videos.UnitOfWork.Interface;

namespace Videos.UnitOfWork.Implementation
{
	public class UnitOfWork : IUnitOfWork
	{
		readonly VideosContext _videosContext;

		private IRepository<Category> _categoryRepos;
		private IRepository<Color> _colorRepos;
		private IRepository<Size> _sizeRepos;
		private IRepository<LineItem> _lineItemsRepos;
		private IRepository<Videos.Models.Type> _typeRepos;
		private IRepository<UserPreferences> _userPreferencesRepos;
		private IRepository<Video> _videoRepos;
		private IRepository<VinScore> _vinScoreRepos;

		//Repositories are implemented as smart properties...only spin them up if needed.....
		public IRepository<Category> categoryRepos
		{
			get { return _categoryRepos ?? (_categoryRepos = new Repository<Category>(_videosContext)); }
			set { _categoryRepos = value; }
		}
		public IRepository<Color> colorRepos
		{
			get { return _colorRepos ?? (_colorRepos = new Repository<Color>(_videosContext)); }
			set { _colorRepos = value; }
		}
		public IRepository<Size> sizeRepos
		{
			get { return _sizeRepos ?? (_sizeRepos = new Repository<Size>(_videosContext)); }
			set { _sizeRepos = value; }
		}
		public IRepository<LineItem> lineItemsRepos
		{
			get { return _lineItemsRepos ?? (_lineItemsRepos = new Repository<LineItem>(_videosContext)); }
			set { _lineItemsRepos = value; }
		}
		public IRepository<UserPreferences> userPreferencesRepos
		{
			get { return _userPreferencesRepos ?? (_userPreferencesRepos = new Repository<UserPreferences>(_videosContext)); }
			set { _userPreferencesRepos = value; }
		}
		public IRepository<Video> videoRepos
		{
			get { return _videoRepos ?? (_videoRepos = new Repository<Video>(_videosContext)); }
			set { _videoRepos = value; }
		}
		public IRepository<VinScore> vinScoreRepos
		{
			get { return _vinScoreRepos ?? (_vinScoreRepos = new Repository<VinScore>(_videosContext)); }
			set { _vinScoreRepos = value; }
		}
		public IRepository<Videos.Models.Type> typeRepos
		{
			get { return _typeRepos ?? (_typeRepos = new Repository<Videos.Models.Type>(_videosContext)); }
			set { _typeRepos = value; }
		}


		public UnitOfWork(VideosContext videoscontext)
		{
			_videosContext = videoscontext;
		}

		public void Save()
		{
			_videosContext.SaveChanges();
		}
		private bool _disposed = false;

		protected virtual void Dispose(bool disposing)
		{
			if (!this._disposed)
			{
				if (disposing)
					_videosContext.Dispose();
			}
			this._disposed = true;
		}
		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}
	}
}