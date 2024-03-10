using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace ContainerAppsEnvVariables.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContainerInfoController : ControllerBase
    {
        private ContainerInfo containerInfo;
        private readonly ILogger<ContainerInfoController> logger;

        public ContainerInfoController(ILogger<ContainerInfoController> logger)
        {
            this.containerInfo = new ContainerInfo();
            this.logger = logger;
        }

        [HttpGet(Name = "GetContainerInfo")]
        public ContainerInfo Get()
        {
            this.containerInfo.ReplicaName = Environment.MachineName;
            string revision = Environment.GetEnvironmentVariable("CONTAINER_APP_REVISION"); // Azure Container Apps
            if (string.IsNullOrEmpty(revision))
                revision = Environment.GetEnvironmentVariable("K_REVISION"); // Evolution Container Apps
            this.containerInfo.RevisionName = revision;
            this.containerInfo.Envs = Environment.GetEnvironmentVariables();

            return this.containerInfo;
        }
    }

    public class ContainerInfo
    {
        public string ReplicaName { get; set; }

        public string RevisionName { get; set; }

        public IDictionary Envs { get; set; }
    }
}
