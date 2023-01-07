using InterviewProject;
using InterviewProject.Domain.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;

namespace InterviewProjects.IntegrationTests
{
  public class IntegrationTest
  {
    protected readonly HttpClient TestClient;

    public IntegrationTest()
    {
      var appFactory = new WebApplicationFactory<Startup>();
      TestClient = appFactory.CreateClient();


    }
  }
}
