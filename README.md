# Video Creation X — Tutorial Resources

Tutorial scripts and resources for the [Video Creation X](https://github.com/ForeverDreamer/video-creation-x-tutorials) deployment guide series.

Each folder corresponds to a tutorial video. Download the ZIP from [Releases](https://github.com/ForeverDreamer/video-creation-x-tutorials/releases), or browse the source code directly.

## WSL2 Environment Setup

**Video**: *How to Set Up WSL2 for AI Development | Complete Guide*

4 scripts to check system requirements and generate optimal WSL2 configuration:

| File | What it does |
| ---- | ------------ |
| `Run-WSL2-Check.bat` | Launcher — double-click to check WSL2 requirements |
| `Check-WSL2-Requirements.ps1` | Checks OS version, virtualization, disk space |
| `Run-WSL-Config-Recommend.bat` | Launcher — double-click to get .wslconfig recommendation |
| `Recommend-WSL-Config.ps1` | Auto-detects RAM/CPU and generates optimal .wslconfig |

### Quick Start

1. Download `wsl2-setup-scripts.zip` from [Releases](https://github.com/ForeverDreamer/video-creation-x-tutorials/releases/tag/wsl2-setup-v1.0)
2. Extract to any folder
3. Double-click `Run-WSL2-Check.bat` to check if your system is ready for WSL2
4. Double-click `Run-WSL-Config-Recommend.bat` to generate your optimal .wslconfig

> Both scripts support English and Chinese (auto-detected from system locale).

## License

[MIT](LICENSE)
