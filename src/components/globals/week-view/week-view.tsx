'use client';

import { VercelBlogPostI } from '@/actions';
import {
  addDays,
  addWeeks,
  format,
  getWeek,
  isToday,
  setMonth,
  setYear,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import { SetStateAction, useEffect, useState } from 'react';

export const CalendarWidget = ({ data }) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [selectedDay, setSelectedDay] = useState<Date>(new Date()); // Initialize selectedDay with the current date
  const [blogs, setBlogs] = useState<VercelBlogPostI[]>([]);

  useEffect(() => {
    setBlogs(data as unknown as SetStateAction<VercelBlogPostI[]>);
  }, [data]);

  const startOfTheWeek = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Start week on Monday
  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfTheWeek, i));

  const handlePrevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
    setSelectedDay(null); // Reset selected day when changing weeks
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
    setSelectedDay(null); // Reset selected day when changing weeks
  };

  const handleDayClick = (date) => {
    setSelectedDay(date);
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentWeek(setMonth(currentWeek, newMonth));
    setSelectedDay(null); // Reset selected day when changing months
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentWeek(setYear(currentWeek, newYear));
    setSelectedDay(null); // Reset selected day when changing years
  };

  const getBlogsForSelectedDay = () => {
    if (!selectedDay) return [];
    return blogs.filter(
      (blog) => format(new Date(blog.date), 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd'),
    );
  };

  const blogsForSelectedDay = getBlogsForSelectedDay();

  const months = Array.from({ length: 12 }, (_, i) => format(setMonth(new Date(), i), 'MMMM'));
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i); // Adjust the range as needed

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handlePrevWeek} style={styles.navButton}>
          ‹
        </button>
        <div style={styles.monthYear}>
          <select
            value={format(currentWeek, 'M') - 1}
            onChange={handleMonthChange}
            style={styles.select}
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={format(currentWeek, 'yyyy')}
            onChange={handleYearChange}
            style={styles.select}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleNextWeek} style={styles.navButton}>
          ›
        </button>
      </div>
      <div style={styles.week}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <div key={index} style={styles.dayLabel}>
            {day}
          </div>
        ))}
      </div>
      <div style={styles.week}>
        {days.map((date, index) => (
          <div
            key={index}
            style={{
              ...styles.day,
              ...(isToday(date) ? styles.today : {}),
              ...(selectedDay && selectedDay.getTime() === date.getTime()
                ? styles.selectedDay
                : {}),
            }}
            onClick={() => handleDayClick(date)}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>
      <div style={styles.footer}>
        <div>{`W${getWeek(currentWeek, { weekStartsOn: 1 })}`}</div>
        <div>
          {format(startOfTheWeek, 'EEEE')} {format(startOfTheWeek, 'd MMM yyyy')}
        </div>
      </div>
      {selectedDay && (
        <div style={styles.content}>
          <h3>Content for {format(selectedDay, 'EEEE, d MMM yyyy')}</h3>
          {blogsForSelectedDay.length > 0 ? (
            blogsForSelectedDay.map((blog, index) => (
              <div key={index} style={styles.blog}>
                <h4>{blog.title}</h4>
                <p>{blog.content}</p>
              </div>
            ))
          ) : (
            <p>No blog posts for this day.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '10px',
    padding: '10px',
    width: '300px', // Increased width to accommodate blog content
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  monthYear: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  select: {
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginBottom: '5px',
  },
  navButton: {
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  week: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  day: {
    flex: 1,
    textAlign: 'center',
    padding: '5px 0',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  today: {
    backgroundColor: 'red',
    color: 'white',
  },
  selectedDay: {
    backgroundColor: 'blue',
    color: 'white',
  },
  footer: {
    marginTop: '10px',
    textAlign: 'center',
  },
  content: {
    marginTop: '10px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
    textAlign: 'center',
  },
  blog: {
    marginBottom: '10px',
  },
};
