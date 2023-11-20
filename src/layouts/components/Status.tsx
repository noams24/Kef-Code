'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import axios, { AxiosError } from 'axios'
import { useCustomToasts } from '@/hooks/use-custom-toast'
import { toast } from '@/hooks/use-toast'
import { useQuery , useMutation } from '@tanstack/react-query'
import { useDevelop } from '@/store/store'
import 'tippy.js/dist/tippy.css';
import { useState } from "react";

const Status = ({problemId}:any) => {
  
  const { loginToast } = useCustomToasts();
  const { development } = useDevelop();
  const [status,setStatus] = useState<string>('BEGIN');

  const { data: previousStatus } = useQuery({
    queryKey: ['status'],
    queryFn: async () => {
        if (development) return null
        const query = `/api/getStatus?problemId=${problemId}`
        const { data } = await axios.get(query)
        setStatus(data.status);
        return data
    },
},)

  const { mutate: handleClick} = useMutation({
    mutationFn: async (status : any) => {
      setStatus(status);
      const payload: any = { problemId, status }
      const { data } = await axios.post('/api/setStatus', payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }
      toast({
        title: 'There was an error.',
        description: 'Could not create subreddit.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
    },
  })

  return (
    <div>
      {previousStatus &&
       <Select defaultValue={status} onValueChange={(status) => (handleClick(status))}>
        <SelectTrigger className="w-full">
         {status}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel dir="rtl">סטטוס</SelectLabel>
            <SelectItem dir="rtl" value="BEGIN">
              עוד לא התחלתי
            </SelectItem>
            <SelectItem dir="rtl" value="ONGOING">
              בתהליך
            </SelectItem>
            <SelectItem dir="rtl" value="STUCK">
              תקוע
            </SelectItem>
            <SelectItem dir="rtl" value="FINISH">
              סיימתי
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>}
    </div>
    // <QuestionMarkCircledIcon width={25} height={25}/>
  );
};

export default Status;
