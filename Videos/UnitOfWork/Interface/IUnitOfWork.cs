using System;
using Videos.Repository.Interface;
namespace Videos.UnitOfWork.Interface
{
	public interface IUnitOfWork
	{
		IRepository<Videos.Models.Category> categoryRepos { get; }
		IRepository<Videos.Models.Color> colorRepos { get; }
		IRepository<Videos.Models.LineItem> lineItemsRepos { get; }
		IRepository<Videos.Models.Size> sizeRepos { get; }
		IRepository<Videos.Models.Type> typeRepos { get; }
		IRepository<Videos.Models.UserPreferences> userPreferencesRepos { get; }
		IRepository<Videos.Models.Video> videoRepos { get; }
		IRepository<Videos.Models.VinScore> vinScoreRepos { get; }
		void Save();
		void Dispose();
	}
}
