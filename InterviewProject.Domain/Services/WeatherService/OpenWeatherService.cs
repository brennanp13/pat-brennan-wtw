using InterviewProject.Domain.Models;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace InterviewProject.Domain.Services.WeatherService
{
  public class OpenWeatherService : IWeatherService
  {
    private readonly WeatherAPISettings _weatherAPISettings;
    private readonly HttpClient _httpClient;
    private readonly ILogger<OpenWeatherService> _logger;

    public OpenWeatherService(WeatherAPISettings weatherAPISettings, HttpClient httpClient, ILogger<OpenWeatherService> logger)
    {
      _weatherAPISettings = weatherAPISettings;
      _logger = logger;


      var clientHandler = new HttpClientHandler() { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate };
      _httpClient = new HttpClient(clientHandler);

      _httpClient.DefaultRequestHeaders.Add("Accept-Encoding", "gzip"); // best practice per weahter api documentation
    }

    public Task<IEnumerable<WeatherForecast>> GetFiveDayWeatherForecast(string location)
    {
      throw new NotImplementedException();
    }

    public async Task<IEnumerable<WeatherLocation>> PostalCodeSearch(string postalCode)
    {
      var url = BuildPostalCodeSearchURL(postalCode);
      var apiResponse = await _httpClient.GetAsync(url);
      if (apiResponse.IsSuccessStatusCode)
      {

        var content = await apiResponse.Content.ReadAsStringAsync();
        var locations = JsonConvert.DeserializeObject<IEnumerable<OpenWeatherLocation>>(content);
        var result = locations.Select((location) => new WeatherLocation() { Key = location.Key, Name = location.EnglishName, Rank = location.Rank });

        return result;
      } else
      {
        _logger.LogError("Open Weather API response was unsuccessful", apiResponse);
        throw new Exception("Open Weather API response was unsuccessful");
      }

    }

    private string BuildPostalCodeSearchURL(string postalCode)
    {
      if (string.IsNullOrEmpty(postalCode))
      {
        throw new ArgumentNullException(nameof(postalCode));
      }

      if (string.IsNullOrEmpty(_weatherAPISettings.APIKey))
      {
        throw new ArgumentNullException(nameof(_weatherAPISettings.APIKey));
      }

      if (string.IsNullOrEmpty(_weatherAPISettings.BaseURL))
      {
        throw new ArgumentNullException(nameof(_weatherAPISettings.BaseURL));
      }

      return $"{_weatherAPISettings.BaseURL}/locations/v1/postalcodes/search?apikey={_weatherAPISettings.APIKey}&q={postalCode}";

    }
  }
}
