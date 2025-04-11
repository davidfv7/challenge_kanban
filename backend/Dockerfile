# build stage
FROM python:3.9 AS builder

RUN apt-get update \
    && apt-get -y install libpq-dev gcc 

# install pdm
RUN pip install -U pip setuptools wheel
#RUN pip install 'urllib3==1.26.15'
RUN pip install pdm

# copy files
COPY pyproject.toml pdm.lock /api/
COPY src/ /api/src


WORKDIR /api/src
RUN pdm config python.use_venv false
RUN mkdir __pypackages__  && pdm install

#run stage
FROM python:3.9

#RUN pip install psycopg2-binary


# retrieve packages from build stage
ENV PYTHONPATH=$PYTHONPATH:/api/pkgs
COPY --from=builder /api/__pypackages__/3.9/lib /api/pkgs
COPY --from=builder /api/src /api/src
WORKDIR /api/src

EXPOSE 5001

CMD python -m uvicorn  main:app   --host 0.0.0.0 --port 5001 --reload