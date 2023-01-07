using InterviewProject.Domain.Models;
using InterviewProject.Domain.Services.WeatherService;
using Microsoft.Extensions.Logging;
using Moq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace InterviewProjects.IntegrationTests
{
  public class WeatherForecastControllerTests : IntegrationTest
  {
    private readonly OpenWeatherService _sut;
    private readonly Mock<ILogger<OpenWeatherService>> _loggerMock;
    private WeatherAPISettings _weatherAPISettings;
    private HttpClient _httpClient;

    public WeatherForecastControllerTests()
    {
      _weatherAPISettings = new WeatherAPISettings()
      {
        APIKey = "UAG40Y7wfIwdKQtI9JFOP1WC0dQac7Ka",
        BaseURL = "http://dataservice.accuweather.com"
      };

      var clientHandler = new HttpClientHandler() { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate };
      _httpClient = new(clientHandler);


      _loggerMock = new();

      _sut = new OpenWeatherService(_weatherAPISettings, _httpClient, _loggerMock.Object);
    }

    [Fact]
    public async Task GetLocationByPostalCode_ReturnsValidLocations()
    {
      // Arrange
      var postalCode = "19125";

      // Act

      var weatherLocations = await _sut.PostalCodeSearch(postalCode);

      //Assert

      Assert.NotNull(weatherLocations);
      Assert.NotEmpty(weatherLocations);
    }

    [Fact]
    public async Task GetLocationByPostalCode_ReturnsNoLocations()
    {
      // Arrange
      var postalCode = "x";

      // Act

      var weatherLocations = await _sut.PostalCodeSearch(postalCode);

      //Assert

      Assert.NotNull(weatherLocations);
      Assert.Empty(weatherLocations);
    }
  }
}
