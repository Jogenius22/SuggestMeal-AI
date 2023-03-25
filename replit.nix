{ pkgs }: {
  deps = [
    pkgs.yarn
    pkgs.nodejs
    pkgs.nodePackages.typescript-language-server
    pkgs.replitPackages.jest
  ];
}
