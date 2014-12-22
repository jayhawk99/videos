using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using Videos.Repository.Interface;
using System.Data.Entity.Core.Objects;
using Videos.Models;
using System.Data.Entity;

namespace Videos.Repository.Implementation
{
	public class Repository<T>  : IRepository<T> where T : class, IEntity
	{
		readonly VideosContext _ctx;
		public Repository(VideosContext context)
		{
			_ctx = context;
		}
		public IQueryable<T> All
		{
			get { return _ctx.Set<T>().AsQueryable(); }
		}

		public IQueryable<T> Find(Expression<Func<T, bool>> predicate)
		{
			return _ctx.Set<T>().Where(predicate).AsQueryable();
		}

		public T Find(int id)
		{
			return _ctx.Set<T>().Single(o => o.Id == id);
		}

		public void InsertOrUpdate(T entity)
		{

			if (entity.Id == default(int))
			{
				_ctx.Set<T>().Add(entity);
			}
			else
			{
				_ctx.Entry<T>(entity).State = EntityState.Modified;
			}
		}

		public void Delete(int id)
		{
			_ctx.Set<T>().Remove(this.Find(id));
		}

		public void Dispose()
		{
			_ctx.Dispose();
		}
	}
}