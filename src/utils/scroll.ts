export const onScrollToTop = (id?: string) => {
  const targetElement = document.querySelector(`#${id}`);
  if (targetElement) {
      targetElement.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
