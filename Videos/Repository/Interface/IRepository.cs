using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Videos.Repository.Interface
{
	public interface IRepository<T> : IDisposable where T : class, IEntity
	{
		IQueryable<T> All { get; }
		IQueryable<T> Find(Expression<Func<T, bool>> predicate);
		T Find(int id);
		void InsertOrUpdate(T entity);
		void Delete(int id);
	}
}