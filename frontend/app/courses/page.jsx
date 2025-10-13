'use client';
import { useEffect, useState } from 'react'; import { api } from '@/lib/api';
export default function Courses(){ const [courses,setCourses]=useState(null); useEffect(()=>{ api('/path/courses?skills=Programming Basics,Web Fundamentals').then(setCourses); },[]); return(<div className='p-6 space-y-3'><h1 className='text-xl font-bold'>Course Recommendation</h1>{courses&&<pre className='bg-gray-100 p-3 rounded'>{JSON.stringify(courses,null,2)}</pre>}</div>);}
