using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ninject.Parameters;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(Videos.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(Videos.App_Start.NinjectWebCommon), "Stop")]
 
namespace Videos.App_Start
{
    using System;
    using System.Web;
    using System.Web.Http.Dependencies;
    using Microsoft.Web.Infrastructure.DynamicModuleHelper;
    using Ninject;
    using Ninject.Syntax;
    using Ninject.Web.Common;
    using Ninject.Extensions.Conventions;
    using Videos.Repository.Implementation;
    using Videos.Repository.Interface;
    using Videos.Models;
	using System.Data.Entity.Core.Objects;
	using System.Data.Entity;
	using Videos.UnitOfWork.Interface;
	using Videos.UnitOfWork.Implementation;

    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper Bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            Bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            Bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
            
            RegisterServices(kernel);
            GlobalConfiguration.Configuration.DependencyResolver = new NinjectResolver(kernel);
            //System.Web.Mvc.DependencyResolver.SetResolver(new NinjectDependencyResolver(kernel));

            return kernel;
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {			
			kernel.Bind(typeof(IUnitOfWork)).To(typeof(UnitOfWork));
			kernel.Bind(typeof(VideosContext)).To(typeof(VideosContext));
			//kernel.Bind(typeof(IRepository<Videos.Models.Type>)).To(typeof(Repository<Videos.Models.Type>));
			//kernel.Bind(typeof(IRepository<Videos.Models.Video>)).To(typeof(Repository<Videos.Models.Video>));
			//kernel.Bind(typeof(IRepository<Videos.Models.Category>)).To(typeof(Repository<Videos.Models.Category>));
			//kernel.Bind(typeof(IRepository<Videos.Models.Color>)).To(typeof(Repository<Videos.Models.Color>));
			//kernel.Bind(typeof(IRepository<Videos.Models.LineItem>)).To(typeof(Repository<Videos.Models.LineItem>));
			//kernel.Bind(typeof(IRepository<Videos.Models.Size>)).To(typeof(Repository<Videos.Models.Size>));
			//kernel.Bind(typeof(IRepository<Videos.Models.UserPreferences>)).To(typeof(Repository<Videos.Models.UserPreferences>));
			//kernel.Bind(typeof(IRepository<Videos.Models.VinScore>)).To(typeof(Repository<Videos.Models.VinScore>));


			//kernel.Bind(x => x
			//.FromAssembliesMatching("*")
			//.SelectAllClasses()
			//.BindDefaultInterface());

        }        
    }

    public class NinjectScope : IDependencyScope
    {
        protected IResolutionRoot ResolutionRoot;

        public NinjectScope(IResolutionRoot kernel)
        {
            ResolutionRoot = kernel;
        }

        public object GetService(System.Type serviceType)
        {
            var request = ResolutionRoot.CreateRequest(serviceType, null, new Parameter[0], true, true);
            return ResolutionRoot.Resolve(request).SingleOrDefault();
        }

        public IEnumerable<object> GetServices(System.Type serviceType)
        {
            var request = ResolutionRoot.CreateRequest(serviceType, null, new Parameter[0], true, true);
            return ResolutionRoot.Resolve(request).ToList();
        }

        public void Dispose()
        {
            var disposable = (IDisposable)ResolutionRoot;
            if (disposable != null) disposable.Dispose();
            ResolutionRoot = null;
        }
    }

    public class NinjectResolver : NinjectScope, IDependencyResolver
    {
        private readonly IKernel _kernel;
        public NinjectResolver(IKernel kernel)
            : base(kernel)
        {
            _kernel = kernel;
        }
        public IDependencyScope BeginScope()
        {
            return new NinjectScope(_kernel.BeginBlock());
        }
    }
}
