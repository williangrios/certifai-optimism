"use client";
import React from "react";
import Button from "./Button";
import { useAccount, useWriteContract, type BaseError } from "wagmi";
import {
  AcademicManagerSmartContractABI,
  AcademicManagerSmartContractAddress,
} from "../blockchain";
import LessonDescription from "./LessonDescription";
import HandlingErrorService from "../services/HandlingErrorService";

interface CourseCardProps {
  course: any;
  showEnrollButton: boolean;
}

function CourseCard({ course, showEnrollButton }: CourseCardProps) {
  const { isConnected, status } = useAccount();
  const { writeContract, error } = useWriteContract();

  function handleEnrollCourse(courseId: number) {
    writeContract({
      address: AcademicManagerSmartContractAddress,
      abi: AcademicManagerSmartContractABI,
      functionName: "enrollStudent",
      args: [courseId],
    });
  }

  return (
    <div className="max-w-[700px] flex flex-col w-full m-auto p-4 gap-4 rounded-2xl border-gray-500 bg-gray-100 text-gray-600">
      <div className="flex flex-row gap-4">
        <div className="">imagem</div>
        <div className="flex flex-col gap-1 w-full">
          <p className="">id: {course.courseId.toString()}</p>
          <h2 className="text-2xl font-semibold text-justify">
            {course.courseName}
          </h2>
          <p className="text-justify">{course.courseDescription}</p>
          <p className="">{course.courseImageURI}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="">Módulos</h3>
        {course.lessons.map((lesson: any, i: number) => (
          <LessonDescription lesson={lesson} key={i} />
        ))}
      </div>
      {error && (
        <div>
          {HandlingErrorService.getShortError(
            (error as BaseError).shortMessage || error.message
          )}
        </div>
      )}
      {showEnrollButton && (
        <div className="w-full flex justify-end">
          <Button
            color="pink"
            disabled={!isConnected}
            onClick={() => handleEnrollCourse(course.courseId)}
          >
            Matricular
          </Button>
        </div>
      )}
    </div>
  );
}

export default CourseCard;