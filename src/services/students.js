import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/",
    }),
    tagTypes: ["Students"], //it is simple just write a name
    endpoints: (builder) => ({
        getSudents: builder.query({
            query: () => "students",
            transformResponse: (res) => res.reverse(),
            providesTags: ["Students"]
        }),
        getSudentById: builder.query({
            query: (id) => "students/" + id,
        }),
        addStudent: builder.mutation({
            query: (student) => ({
                url: "students",
                method: "POST",
                body: student,
            }),
            invalidatesTags: ["Students"],
        }),
        updateStudent: builder.mutation({
            query: ({ id, ...student }) => ({
                url: `students/${id}`,
                method: "PUT",
                body: student,
                //here we have to send the id too
            }),
            invalidatesTags: ["Students"],
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `students/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Students"],
        })
    })
})

export const { useGetSudentsQuery, useGetSudentByIdQuery, useAddStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation } = studentsApi
//whenever we made a mutation the latest data will render at the last
//and when we add new data it will not visible in the home page bcause home page data is loaded and it is cached data, it will render when we reload page,bcause it will make refect
//to save from this issue we use tag type
//we have to add tagType and after that we will get to tagds
// provided and invalidate tags
//we have to add invalidate in mutation.bcause we are changing the data,
//invalidate is used in mutation and we have to provide tag on the endpoint where mutaion affects
//we will add provide tag in affected place,it will refach when ther is a mutation
//jaha jaha provide tag hoga waha refect hoga,
