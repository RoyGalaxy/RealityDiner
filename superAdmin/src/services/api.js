// Mock API service
export const fetchSalesData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Online Sales',
            data: [120, 190, 150, 210],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'In-Store Sales',
            data: [80, 100, 90, 130],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
    }, 1000); // Simulate network delay
  });
};