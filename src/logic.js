const filterData = (data, genre) => {
    const nowFilter = data.filter((element) => {
  
      return element.includes(genre);
    });
    return nowFilter;
  }
  window.filterData = filterData;