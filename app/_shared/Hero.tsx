"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { ChevronRight, Loader2, Send } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { suggestions } from "@/data/constant"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import axios from "axios"

function Hero() {

  const [userInput, setUserInput] = useState<string>("")
  const [device, setevice] = useState<string>("website")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = useUser()
  const router = useRouter()

  const onCreatePrompt = async () => {
    if (!user) {
      router.push("/sign-in")
      return
    }

    if (!userInput) {
      return
    }

    setIsLoading(true)
    const projectId = crypto.randomUUID()
    const result = await axios.post("/api/project", {
      userInput: userInput,
      device: device,
      projectId: projectId,
    })

    setIsLoading(false)
  }

  return (
    <div className='flex flex-col items-center justify-center p-10 pt-20 md:px-24 lg:px-48 xl:px-5 space-y-10'>
      <div className='flex flex-col items-center justify-center max-w-4xl mx-auto space-y-4'>

        <Badge variant="outline" className="rounded-full px-4 py-1 text-md cursor-pointer group hover:bg-accent/50 hover:text-accent-foreground transition-all duration-300 ease-in-out">
          Get Started with <span className="font-artifika">Flow</span>
          <ChevronRight strokeWidth={3} className="ml-1 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:stroke-accent-foreground" />
        </Badge>

        <h2 className='sm:text-5xl text-4xl font-bold text-center'>Generate Mockup for your <span className='text-primary font-artifika'>UI/UX Design with</span> AI</h2>
        <p className='md:text-lg text-md font-medium text-gray-600 text-center'>Generate high quality UI/UX designs with AI. Perfect for web and mobile apps.</p>
      </div>

      <div className="flex justify-center w-full gap-6">
        <InputGroup className='max-w-xl bg-background z-10 rounded-xl'>
          <InputGroupTextarea
            data-slot="input-group-control"
            className="flex field-sizing-content min-h-20 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-md font-medium transition-[color,box-shadow] outline-none md:text-sm"
            placeholder="Type your prompt here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <InputGroupAddon align="block-end">
            <Select defaultValue="website" onValueChange={(value) => setevice(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <InputGroupButton type="button" disabled={isLoading} className="ml-auto" size="sm" variant="default" onClick={onCreatePrompt}>
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-4 mt-10">
        {suggestions.map((suggestion) => (
          <div key={suggestion.name} onClick={() => setUserInput(suggestion.description)} className="flex flex-col gap-2 p-2 rounded-xl bg-accent/10 border w-28 h-24 cursor-pointer hover:bg-accent transition-all duration-300 ease-in-out select-none">
            <suggestion.icon className="size-5 text-foreground" />
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-foreground text-center">{suggestion.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero