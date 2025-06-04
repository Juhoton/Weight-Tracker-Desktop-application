let profile = '';

const useProfile = () => {
  return {
    get get() {
      return profile;
    },
    set: (name) => {
      profile = name;
    },
  };
};

export { useProfile };