const getUserIdByToken = async session => {
  const currentSession = await session.getSessionByToken();
  if (!currentSession) {
    return Error('Invalid token');
  }
  const { userId } = currentSession;
  return userId;
};

module.exports = {
  getUserIdByToken,
};
