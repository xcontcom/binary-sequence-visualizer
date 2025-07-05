# Binary sequence visualizer
Interactive binary fractal visualizer with dynamic HSL coloring and Node.js scripts to export GIF/MP4.

[Online demo](https://xcont.com/binarypattern/fractal_dynamic_45_color.html)

Based on [https://github.com/xcontcom/billiard-fractals](https://github.com/xcontcom/billiard-fractals)

---

## How it works

* We create a 1D sequence by accumulating +1 or -1 steps, based on whether scaled input values land in even or odd intervals (floor(...) % 2).
* We combine this sequence pairwise in a 2D grid: sequence[x] + sequence[y].
* For each cell, we check if this sum satisfies modular conditions (mod 4 or mod 5) that change over time.
* Cells matching these conditions are colored dynamically with an HSL palette; others are black.
* As the animation advances, the pattern cycles and reveals hidden structures.

---




https://github.com/user-attachments/assets/cfd85be5-7079-4010-a12a-f4272d47a835



https://github.com/user-attachments/assets/69e0871a-e50c-4ff7-852e-b9550341f277



https://github.com/user-attachments/assets/e638bb7f-da1b-4932-b048-753999452d26



https://github.com/user-attachments/assets/4f856d8c-b814-4f6f-8f37-0e4971fe391d



https://github.com/user-attachments/assets/da29398b-3356-4dc2-a74a-d08f9fe37ab1



https://github.com/user-attachments/assets/6fe8e59c-3d9e-4adb-9db5-f041f3efa744



https://github.com/user-attachments/assets/e2d23d5d-4dc6-4c4a-8feb-2c56b38a6ac6



https://github.com/user-attachments/assets/9d670149-0163-4bca-8175-94c346d15021



https://github.com/user-attachments/assets/9f2540c5-15dd-4232-9f43-4c52cccfce91



---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 👤 Author

Serhii Herasymov  

sergeygerasimofff@gmail.com  

https://github.com/xcontcom
