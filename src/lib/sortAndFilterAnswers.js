const sortAndFilterAnswers = (data) => {
  data.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateB - dateA;
  });
  
  console.log("sortAndfilterAnswers: sorted data by updatedAt: ", data);
  
  const filteredData = data.reduce((result, currentAnswer) => {
    const guestIndex = result.findIndex(
      answer => answer.guestAnswersId === currentAnswer.guestAnswersId
    );
    
    // new guest answer, add to array
    if (guestIndex === -1) {
      result.push(currentAnswer);
    }
  
    return result;
  }, []);

  return filteredData;
};

export default sortAndFilterAnswers;
