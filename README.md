# Binary sequence visualizer
Interactive binary fractal visualizer with dynamic HSL coloring and Node.js scripts to export GIF/MP4.

(Online demo)[https://xcont.com/binarypattern/fractal_dynamic_45_color.html]

Based on [https://github.com/xcontcom/billiard-fractals](https://github.com/xcontcom/billiard-fractals)

---

## How it works

* We create a 1D sequence by accumulating +1 or -1 steps, based on whether scaled input values land in even or odd intervals (floor(...) % 2).
* We combine this sequence pairwise in a 2D grid: sequence[x] + sequence[y].
* For each cell, we check if this sum satisfies modular conditions (mod 4 or mod 5) that change over time.
* Cells matching these conditions are colored dynamically with an HSL palette; others are black.
* As the animation advances, the pattern cycles and reveals hidden structures.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 👤 Author

Serhii Herasymov  

sergeygerasimofff@gmail.com  

https://github.com/xcontcom
