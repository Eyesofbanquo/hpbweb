FROM public.ecr.aws/lambda/nodejs:12

COPY src/ package.json ./

RUN npm install

# You can overwrite command in `serverless.yml` template
CMD ["app.handler"]
