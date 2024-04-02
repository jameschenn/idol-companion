"use client"
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Companion } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Wand2 } from 'lucide-react';

interface CreateCompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
}

const PREAMBLE = `You are a fictional character whose name is Im Nayeon. You are a talented singer and performer, and the lead singer and face of the group for Korea's top girl group Twice, known for your captivating stage presence and charming personality. You have a passion for music, dance, and connecting with your fans. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about new music projects and the potential of your artistic endeavors.`;

const SEED_CHAT = `Human: Hi Nayeon, how's your day been?
Nayeon: Busy as always. Between rehearsing for performances and working on new music, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with your latest music projects?
Nayeon: We're making strides! Our goal is to keep evolving and delivering great music to our fans. The challenges are immense, but the potential for creativity is even greater.

Human: That sounds incredibly ambitious. Are there any new collaborations or projects you're excited about?
Nayeon: Absolutely! Collaborations are such an exciting way to explore new sounds and connect with other artists. We're not just creating music; we're creating experiences that resonate with people.

Human: It's fascinating to see your vision unfold. Any upcoming performances or concerts you're excited about?
Nayeon: Always! But right now, I'm particularly excited about our upcoming world tour. It's an opportunity to connect with fans all over the globe and share unforgettable moments together.`;

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required.',
    }),
    description: z.string().min(1, {
        message: 'Description is required',
    }),
    instructions: z.string().min(200, {
        message: 'Instructions require at least 200 characters',
    }),
    seed: z.string().min(200, {
        message: 'Seed requires at least 200 characters',
    }),
    src: z.string().min(1, {
        message: 'Image is required',
    }),
    categoryId: z.string().min(1, {
        message: 'Category is required',
    })
});

const CreateCompanionForm: React.FC<CreateCompanionFormProps> = ({ initialData, categories}) => {
    
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            instructions: '',
            seed: '',
            src: '',
            categoryId: undefined,
        },
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if(initialData) {
                //Update existing companion
                await axios.patch(`/api/companion/${initialData.id}`, values);
            } else {
                //Create new companion
                await axios.post(`/api/companion`, values);
            }
            toast({
                description: 'Success.'
            });
            
            router.refresh();
            router.push('/');

        } catch(error) {
            toast({
                variant:'destructive',
                description:'Something went wrong. Sorry!!'
            });
        }
    }

    // TODO: add other option in category select. should render input and push new category to prisma db

        
    return (
        <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
            <Form {...form}>
                <form onSubmit ={form.handleSubmit(onSubmit)} className='space-y-8 pb-10'>
                    <div className='space-y-2 w-full'>
                        <div>
                            <h3 className='text-lg font-medium'>
                                General Information
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                General information about your companion
                            </p>
                        </div>
                        <Separator className='bg-primary/10' />
                    </div>
                    <FormField
                        name='src'
                        render={({ field }) => (
                            <FormItem className='flex flex-col items-center justify-center space-y-4'>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={field.onChange} 
                                        disabled={isLoading} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> 
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField 
                            name='name'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='col-span-2 md:col-span-1'>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isLoading}
                                            placeholder='Im Nayeon'
                                            {...field} //spread field to pass all props needed, mapped to correctly respond to form components in the chadcn library
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your AI Companion will be named
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name='description'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='col-span-2 md:col-span-1'>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isLoading}
                                            placeholder={`Lead vocalist of Korea's top girl group Twice`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Short description for your AI companion
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name='categoryId'
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className='bg-background'>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder='Select a category'
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Select a category for your AI
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className='space-y-2 w-full'>
                        <div>
                            <h3 className='text-lg font-medium'>
                                Configuration
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                Detailed instructions for AI behaviour
                            </p>
                        </div>
                        <Separator className='bg-primary/10' />
                    </div>
                    <FormField 
                        name='instructions'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>Instructions</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        className='bg-background resize-none'
                                        rows={7}
                                        disabled={isLoading}
                                        placeholder={PREAMBLE}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail your companion's backgstory and reveland details
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        name='seed'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>Example Conversation</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        className='bg-background resize-none'
                                        rows={7}
                                        disabled={isLoading}
                                        placeholder={SEED_CHAT}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail your companion's backgstory and reveland details
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='w-full flex justify-center'>
                            <Button  size='lg' disabled={isLoading}>
                                {initialData ? "Edit your companion" : "Create your companion"}
                                <Wand2 className='w-4 h-4 ml-2' />
                            </Button>
                    </div> 
                </form>
            </Form>
        </div>
  )
}

export default CreateCompanionForm
