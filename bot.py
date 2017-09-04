import discord
import asyncio

client = discord.Client()

tfile = open("token.txt", "r")
token = tfile.read()

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------------')

@client.event
async def on_message(message):
    await client.send_message(message.channel, "Hello world")

client.run(token)