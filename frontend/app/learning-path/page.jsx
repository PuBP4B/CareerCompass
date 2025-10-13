'use client';
import { useEffect, useState } from 'react'; import { api } from '@/lib/api';
export default function LearningPath(){ const [roadmap,setRoadmap]=useState(null); useEffect(()=>{ api('/path/roadmap').then(setRoadmap); },[]); return(<div className='p-6 space-y-3'><h1 className='text-xl font-bold'>Learning Path</h1>{roadmap&&<pre className='bg-gray-100 p-3 rounded'>{JSON.stringify(roadmap,null,2)}</pre>}</div>);}
