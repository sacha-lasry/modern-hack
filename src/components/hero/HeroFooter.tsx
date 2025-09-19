const HeroFooter = () => {
  return (
    <footer className="bg-secondary/30 backdrop-blur-md border-t py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              NICE APP
            </div>
            <div className="text-sm text-muted-foreground pl-1">
              © {new Date().getFullYear()} NICE APP. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { HeroFooter };
