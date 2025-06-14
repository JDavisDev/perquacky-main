const AppStoreButtons = () => {
  return (
    <div className="app-store-buttons">
      {/* iOS App Store */}
      <a
        href="https://apps.apple.com/us/app/quackle-the-daily-word-game/id6747138786"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="Download on the App Store"
          className="h-12"
        />
      </a>

      {/* Android Google Play */}
      <a
        href="https://play.google.com/store/apps/details?id=com.rocketventures.quackle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Get it on Google Play"
          className="h-12"
          height={40}
        />
      </a>
    </div>
  );
};

export default AppStoreButtons;
