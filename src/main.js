// ===== Feste Dummy-Werte je Jahr (kein Zugriff auf CARBON_DATA) =====
const YEAR_STATS = {
  1980: { totalMt: 21000, perCapitaT: 5.8, co2PerGdp: 0.42, greenPct: 5 },
  1990: { totalMt: 23000, perCapitaT: 6.2, co2PerGdp: 0.39, greenPct: 8 },
  2010: { totalMt: 33000, perCapitaT: 4.9, co2PerGdp: 0.28, greenPct: 12 },
  2025: { totalMt: 37000, perCapitaT: 4.3, co2PerGdp: 0.23, greenPct: 19 },
};

// Helfer für Formatierung
const fmt = (n, d = 0) =>
  Number(n).toLocaleString('de-DE', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });

// Cards updaten
function updateCards(year) {
  const data = YEAR_STATS[year] || YEAR_STATS[2025];

  const cardTotal = document.querySelector('#card-total  .display-6');
  const cardCapita = document.querySelector('#card-capita .display-6');
  const cardGdp = document.querySelector('#card-gdp    .display-6');
  const cardGreen = document.querySelector('#card-green  .display-6');

  if (cardTotal) cardTotal.textContent = `${fmt(data.totalMt, 0)} Mt`;
  if (cardCapita) cardCapita.textContent = `${fmt(data.perCapitaT, 2)} t`;
  if (cardGdp) cardGdp.textContent = `${fmt(data.co2PerGdp, 2)}`;
  if (cardGreen) cardGreen.textContent = `${fmt(data.greenPct, 0)} %`;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('yearSelect');
  if (select) {
    updateCards(select.value);
    select.addEventListener('change', () => updateCards(select.value));
  } else {
    updateCards('2025');
  }
});

var dataSet = [
  ['United Arab Emirates', 'ARE', '1980', '25.0', '20.00', '0.500', '0.20'],
  ['United Arab Emirates', 'ARE', '1990', '60.0', '24.00', '0.450', '0.30'],
  ['United Arab Emirates', 'ARE', '2010', '150.0', '20.00', '0.320', '0.50'],
  ['United Arab Emirates', 'ARE', '2025', '180.0', '15.00', '0.250', '3.00'],

  ['Australia', 'AUS', '1980', '290.0', '18.50', '0.450', '9.00'],
  ['Australia', 'AUS', '1990', '320.0', '18.00', '0.380', '11.00'],
  ['Australia', 'AUS', '2010', '400.0', '18.20', '0.270', '14.00'],
  ['Australia', 'AUS', '2025', '410.0', '15.60', '0.220', '34.00'],

  ['Austria', 'AUT', '1980', '60.0', '8.00', '0.300', '20.00'],
  ['Austria', 'AUT', '1990', '63.0', '8.30', '0.260', '27.00'],
  ['Austria', 'AUT', '2010', '73.0', '8.70', '0.200', '33.00'],
  ['Austria', 'AUT', '2025', '70.0', '7.60', '0.160', '62.00'],

  ['Belgium', 'BEL', '1980', '135.0', '13.60', '0.420', '6.00'],
  ['Belgium', 'BEL', '1990', '140.0', '14.00', '0.360', '8.00'],
  ['Belgium', 'BEL', '2010', '115.0', '10.60', '0.220', '14.00'],
  ['Belgium', 'BEL', '2025', '100.0', '8.60', '0.170', '26.00'],

  ['Brazil', 'BRA', '1980', '220.0', '2.10', '0.400', '43.00'],
  ['Brazil', 'BRA', '1990', '290.0', '2.00', '0.360', '46.00'],
  ['Brazil', 'BRA', '2010', '470.0', '2.40', '0.280', '74.00'],
  ['Brazil', 'BRA', '2025', '520.0', '2.40', '0.230', '82.00'],

  ['Canada', 'CAN', '1980', '420.0', '17.00', '0.440', '18.00'],
  ['Canada', 'CAN', '1990', '470.0', '16.50', '0.360', '21.00'],
  ['Canada', 'CAN', '2010', '550.0', '16.30', '0.270', '24.00'],
  ['Canada', 'CAN', '2025', '520.0', '13.40', '0.200', '36.00'],

  ['China', 'CHN', '1980', '500.0', '0.50', '0.900', '20.00'],
  ['China', 'CHN', '1990', '700.0', '0.60', '0.750', '19.00'],
  ['China', 'CHN', '2010', '9000.0', '6.70', '0.600', '18.00'],
  ['China', 'CHN', '2025', '10200.0', '7.20', '0.420', '31.00'],

  ['Czech Republic', 'CZE', '1980', '160.0', '15.00', '0.550', '5.00'],
  ['Czech Republic', 'CZE', '1990', '150.0', '14.00', '0.500', '7.00'],
  ['Czech Republic', 'CZE', '2010', '120.0', '11.30', '0.320', '15.00'],
  ['Czech Republic', 'CZE', '2025', '100.0', '9.50', '0.250', '30.00'],

  ['Germany', 'DEU', '1980', '1150.0', '14.50', '0.400', '7.00'],
  ['Germany', 'DEU', '1990', '1000.0', '12.60', '0.330', '9.00'],
  ['Germany', 'DEU', '2010', '840.0', '10.30', '0.240', '20.00'],
  ['Germany', 'DEU', '2025', '650.0', '7.80', '0.180', '55.00'],

  ['Denmark', 'DNK', '1980', '70.0', '14.00', '0.460', '10.00'],
  ['Denmark', 'DNK', '1990', '68.0', '13.00', '0.380', '15.00'],
  ['Denmark', 'DNK', '2010', '60.0', '11.00', '0.250', '33.00'],
  ['Denmark', 'DNK', '2025', '40.0', '7.00', '0.180', '65.00'],

  ['Algeria', 'DZA', '1980', '40.0', '2.00', '0.440', '10.00'],
  ['Algeria', 'DZA', '1990', '60.0', '2.30', '0.400', '12.00'],
  ['Algeria', 'DZA', '2010', '120.0', '3.40', '0.320', '15.00'],
  ['Algeria', 'DZA', '2025', '150.0', '3.50', '0.250', '20.00'],

  ['Finland', 'FIN', '1980', '55.0', '11.00', '0.420', '20.00'],
  ['Finland', 'FIN', '1990', '60.0', '11.50', '0.380', '25.00'],
  ['Finland', 'FIN', '2010', '70.0', '12.50', '0.260', '34.00'],
  ['Finland', 'FIN', '2025', '55.0', '9.90', '0.200', '58.00'],

  ['France', 'FRA', '1980', '410.0', '7.50', '0.350', '9.00'],
  ['France', 'FRA', '1990', '380.0', '6.70', '0.300', '12.00'],
  ['France', 'FRA', '2010', '360.0', '5.60', '0.220', '16.00'],
  ['France', 'FRA', '2025', '300.0', '4.50', '0.170', '29.00'],

  ['United Kingdom', 'GBR', '1980', '650.0', '11.50', '0.380', '5.00'],
  ['United Kingdom', 'GBR', '1990', '600.0', '10.30', '0.330', '6.00'],
  ['United Kingdom', 'GBR', '2010', '500.0', '8.00', '0.240', '15.00'],
  ['United Kingdom', 'GBR', '2025', '320.0', '4.80', '0.160', '48.00'],

  ['Greece', 'GRC', '1980', '65.0', '6.50', '0.360', '8.00'],
  ['Greece', 'GRC', '1990', '75.0', '7.10', '0.320', '10.00'],
  ['Greece', 'GRC', '2010', '95.0', '8.10', '0.240', '20.00'],
  ['Greece', 'GRC', '2025', '70.0', '6.50', '0.180', '37.00'],

  ['Hungary', 'HUN', '1980', '100.0', '10.00', '0.500', '6.00'],
  ['Hungary', 'HUN', '1990', '95.0', '9.00', '0.450', '7.00'],
  ['Hungary', 'HUN', '2010', '80.0', '8.00', '0.300', '12.00'],
  ['Hungary', 'HUN', '2025', '65.0', '6.50', '0.220', '28.00'],

  ['India', 'IND', '1980', '160.0', '0.30', '0.550', '30.00'],
  ['India', 'IND', '1990', '210.0', '0.30', '0.500', '28.00'],
  ['India', 'IND', '2010', '1900.0', '1.60', '0.450', '23.00'],
  ['India', 'IND', '2025', '3000.0', '2.10', '0.350', '28.00'],

  ['Ireland', 'IRL', '1980', '30.0', '8.50', '0.350', '5.00'],
  ['Ireland', 'IRL', '1990', '35.0', '9.00', '0.320', '7.00'],
  ['Ireland', 'IRL', '2010', '45.0', '10.00', '0.240', '20.00'],
  ['Ireland', 'IRL', '2025', '38.0', '7.50', '0.180', '42.00'],

  ['Israel', 'ISR', '1980', '25.0', '7.00', '0.400', '3.00'],
  ['Israel', 'ISR', '1990', '40.0', '8.00', '0.350', '4.00'],
  ['Israel', 'ISR', '2010', '65.0', '9.00', '0.280', '7.00'],
  ['Israel', 'ISR', '2025', '55.0', '6.50', '0.220', '20.00'],

  ['Italy', 'ITA', '1980', '360.0', '6.50', '0.340', '9.00'],
  ['Italy', 'ITA', '1990', '410.0', '7.30', '0.320', '12.00'],
  ['Italy', 'ITA', '2010', '380.0', '6.40', '0.240', '22.00'],
  ['Italy', 'ITA', '2025', '290.0', '4.90', '0.180', '38.00'],

  ['Japan', 'JPN', '1980', '1150.0', '10.00', '0.320', '10.00'],
  ['Japan', 'JPN', '1990', '1200.0', '9.80', '0.280', '12.00'],
  ['Japan', 'JPN', '2010', '1200.0', '9.40', '0.240', '18.00'],
  ['Japan', 'JPN', '2025', '1000.0', '8.10', '0.190', '30.00'],

  ['South Korea', 'KOR', '1980', '70.0', '1.90', '0.450', '5.00'],
  ['South Korea', 'KOR', '1990', '150.0', '3.50', '0.400', '6.00'],
  ['South Korea', 'KOR', '2010', '620.0', '12.50', '0.290', '5.00'],
  ['South Korea', 'KOR', '2025', '600.0', '11.50', '0.240', '13.00'],

  ['Kuwait', 'KWT', '1980', '20.0', '18.00', '0.520', '0.20'],
  ['Kuwait', 'KWT', '1990', '40.0', '20.00', '0.480', '0.30'],
  ['Kuwait', 'KWT', '2010', '80.0', '25.00', '0.350', '0.50'],
  ['Kuwait', 'KWT', '2025', '100.0', '22.00', '0.280', '1.00'],

  ['Morocco', 'MAR', '1980', '20.0', '1.00', '0.420', '12.00'],
  ['Morocco', 'MAR', '1990', '30.0', '1.20', '0.380', '14.00'],
  ['Morocco', 'MAR', '2010', '55.0', '1.70', '0.300', '22.00'],
  ['Morocco', 'MAR', '2025', '70.0', '1.80', '0.240', '35.00'],

  ['Mexico', 'MEX', '1980', '210.0', '3.20', '0.420', '10.00'],
  ['Mexico', 'MEX', '1990', '280.0', '3.70', '0.380', '12.00'],
  ['Mexico', 'MEX', '2010', '460.0', '4.20', '0.280', '18.00'],
  ['Mexico', 'MEX', '2025', '500.0', '3.90', '0.220', '27.00'],

  ['Peru', 'PER', '1980', '25.0', '1.50', '0.400', '28.00'],
  ['Peru', 'PER', '1990', '35.0', '1.80', '0.360', '30.00'],
  ['Peru', 'PER', '2010', '60.0', '2.00', '0.280', '40.00'],
  ['Peru', 'PER', '2025', '75.0', '2.20', '0.220', '52.00'],

  ['Portugal', 'PRT', '1980', '60.0', '6.00', '0.380', '10.00'],
  ['Portugal', 'PRT', '1990', '70.0', '6.80', '0.340', '12.00'],
  ['Portugal', 'PRT', '2010', '80.0', '7.50', '0.250', '24.00'],
  ['Portugal', 'PRT', '2025', '65.0', '5.80', '0.180', '45.00'],

  ['Qatar', 'QAT', '1980', '10.0', '25.00', '0.550', '0.10'],
  ['Qatar', 'QAT', '1990', '20.0', '28.00', '0.500', '0.20'],
  ['Qatar', 'QAT', '2010', '90.0', '35.00', '0.380', '0.50'],
  ['Qatar', 'QAT', '2025', '110.0', '32.00', '0.280', '2.00'],

  ['United States', 'USA', '1980', '4900.0', '21.60', '0.550', '6.00'],
  ['United States', 'USA', '1990', '5100.0', '20.50', '0.470', '8.00'],
  ['United States', 'USA', '2010', '5400.0', '17.40', '0.300', '12.00'],
  ['United States', 'USA', '2025', '4900.0', '14.50', '0.220', '25.00'],

  ['Venezuela', 'VEN', '1980', '90.0', '6.50', '0.420', '5.00'],
  ['Venezuela', 'VEN', '1990', '120.0', '7.00', '0.380', '6.00'],
  ['Venezuela', 'VEN', '2010', '160.0', '6.00', '0.300', '7.00'],
  ['Venezuela', 'VEN', '2025', '140.0', '5.00', '0.240', '12.00'],
];

new DataTable('#tabelle', {
  data: dataSet,
  columns: [
    { title: 'Country' },
    { title: 'ISO' },
    { title: 'Year' },
    { title: 'Total Emissions(Mt)' },
    { title: 'Per Capita (t)' },
    { title: 'C0₂ per GDP' },
    { title: 'Green Energy (%)' },
  ],
  paging: true,
  scrollCollapse: true,
  scrollY: '50vh',
  scrollX: true,
  fixedColumns: { left: 1, right: 1 },
  responsive: true,
});

// FullPage.js initialisieren
new fullpage('#fullpage', {
  autoScrolling: true,
  scrollOverflow: true,
  paddingTop: '92px',
  fixedElements: 'header',
});

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Diagramm zeichnen
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Green Energy', 'Carbon Fuel'],
    ['2010', 14, 86],
    ['2025', 19, 81],
    ['2035', 34, 66],
    ['2045', 70, 30],
  ]);

  var options = {
    title: 'Change in Energy Consumption in %',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['#19af13', '#ff6b6b'],
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}

// Sidebar-Funktionen
function w3_open() {
  document.getElementById('Sidebar').style.display = 'block';
  document.getElementById('Overlay').style.display = 'block';
}
function w3_close() {
  document.getElementById('Sidebar').style.display = 'none';
  document.getElementById('Overlay').style.display = 'none';
}

// Diagramm bei Fensteränderung neu zeichnen
$(window).resize(function () {
  drawChart();
});
