using InterviewProject.Domain.Exceptions;
using InterviewProject.Domain.Models;
using InterviewProject.Domain.Services.WeatherService;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace InterviewProjects.IntegrationTests
{
  public class WeatherForecastControllerTests
  {
    private OpenWeatherService _sut;
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


    [Fact]
    public async Task GetLocationByPostalCode_ThrowsAccuWeatherException()
    {
      // Arrange
      var postalCode = "19125";

      _weatherAPISettings.APIKey = "not valid";

      // Act

      var ex = await Assert.ThrowsAsync<AccuWeatherException>(() => _sut.PostalCodeSearch(postalCode));
    }

    [Theory]
    [InlineData(null, "UAG40Y7wfIwdKQtI9JFOP1WC0dQac7Ka", "http://dataservice.accuweather.com")]
    [InlineData("", "UAG40Y7wfIwdKQtI9JFOP1WC0dQac7Ka", "http://dataservice.accuweather.com")]
    [InlineData("19125", null, "http://dataservice.accuweather.com")]
    [InlineData("19125", "", "http://dataservice.accuweather.com")]
    [InlineData("19125", "UAG40Y7wfIwdKQtI9JFOP1WC0dQac7Ka", null)]
    [InlineData("19125", "UAG40Y7wfIwdKQtI9JFOP1WC0dQac7Ka", "")]
    public async Task GetLocationByPostalCode_ThrowsNullArgumentException(string postalCode, string APIKey, string BaseUrl)
    {
      // Arrange
      _weatherAPISettings = new WeatherAPISettings()
      {
        APIKey = APIKey,
        BaseURL = BaseUrl
      };

       _sut = new OpenWeatherService(_weatherAPISettings, _httpClient, _loggerMock.Object);
      // Act

      var ex = await Assert.ThrowsAsync<ArgumentNullException>(() => _sut.PostalCodeSearch(postalCode));
    }
  }
}
