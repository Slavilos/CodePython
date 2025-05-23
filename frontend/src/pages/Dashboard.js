function Dashboard() {
  return (
    <div>
      <h2>Личный кабинет</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Курс</th><th>Оценка</th><th>Дата</th><th>Время</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Курс 1</td><td>5</td><td>01.01.2025</td><td>12:00</td>
          </tr>
          <tr>
            <td>Курс 2</td><td>4</td><td>02.02.2025</td><td>13:30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
