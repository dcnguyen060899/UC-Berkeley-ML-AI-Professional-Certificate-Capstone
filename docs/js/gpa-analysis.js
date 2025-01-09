// GPA data
const gpaData = {
    labels: ["2019 Fall", "2020 Spring", "2020 Summer", "2020 Fall", "2021 Spring", 
             "2021 Summer", "2021 Fall", "2022 Spring", "2022 Summer", "2022 Fall"],
    actual: [2.56, 2.97, 2.85, 2.68, 2.68, 2.86, 2.88, 2.87, 2.88, 2.94],
    predicted: [2.717, 2.739, 2.761, 2.784, 2.806, 2.828, 2.850, 2.873, 2.895, 2.917],
    laterTrend: [null, null, null, null, null, 2.86, 2.88, 2.87, 2.88, 2.94]
};

// Initialize GPA Chart
const gpaCtx = document.getElementById('gpaChart').getContext('2d');
new Chart(gpaCtx, {
    type: 'line',
    data: {
        labels: gpaData.labels,
        datasets: [{
            label: 'Actual GPA',
            data: gpaData.actual,
            borderColor: 'rgb(136, 132, 216)',
            tension: 0.1
        },
        {
            label: 'Overall Trend',
            data: gpaData.predicted,
            borderColor: 'rgb(255, 115, 0)',
            borderDash: [5, 5],
            tension: 0.1
        },
        {
            label: 'Later Terms (R² = 0.855)',
            data: gpaData.laterTrend,
            borderColor: 'rgb(130, 202, 157)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 2.5,
                max: 3
            }
        },
        plugins: {
            annotation: {
                annotations: {
                    transitionLine: {
                        type: 'line',
                        xMin: 3,
                        xMax: 3,
                        borderColor: 'gray',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        label: {
                            content: 'Transition Phase',
                            position: 'top'
                        }
                    }
                }
            }
        }
    }
});

// Volatility data
const volatilityData = {
    labels: ['Adjustment', 'Transition', 'Stabilization', 'Mastery'],
    volatility: [0.48, 0.31, 0.15, 0.10],
    avgGPA: [2.62, 2.81, 2.87, 2.91]
};

// Initialize Volatility Chart
const volCtx = document.getElementById('volatilityChart').getContext('2d');
new Chart(volCtx, {
    type: 'bar',
    data: {
        labels: volatilityData.labels,
        datasets: [{
            label: 'Grade Volatility',
            data: volatilityData.volatility,
            backgroundColor: 'rgb(255, 124, 67)'
        },
        {
            label: 'Average GPA',
            data: volatilityData.avgGPA,
            backgroundColor: 'rgb(130, 202, 157)'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
