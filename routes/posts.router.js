import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

// 게시글 작성
router.post("/posts", async (req, res, next) => {
  const { title, content } = req.body;

  const post = await prisma.posts.create({
    data: { title, content },
  });

  return res.status(201).json({ data: post });
});

// 게시글 전체 조회
router.get("/posts", async (req, res, next) => {
  const posts = await prisma.posts.findMany({
    select: {
      Id: true,
      title: true,
      content: true,
    },
  });

  return res.status(200).json({ data: posts });
});

//  게시글 수정
router.put("/posts/:Id", async (req, res, next) => {
  const { Id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.posts.findUnique({
    where: { Id: +Id },
  });
  if (!post) {
    return res.status(404).json({ errorMessge: "게시글이 존재하지 않음" });
  }

  await prisma.posts.update({
    data: { title, content },
    where: {
      Id: +Id,
    },
  });

  return res.status(200).json({ data: post });
});

//  게시글 삭제
router.delete("/posts/:Id", async (req, res, next) => {
  const { Id } = req.params;
  const post = await prisma.posts.findUnique({
    where: { Id: +Id },
  });

  if (!post) {
    return res.status(404).json({ errorMessge: "게시글이 존재하지 않음" });
  }

  await prisma.posts.delete({
    where: { Id: +Id },
  });

  return res.status(200).json({ Messge: "Success" });
});

export default router;
